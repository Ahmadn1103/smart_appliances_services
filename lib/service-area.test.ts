import { describe, expect, it } from "vitest";
import { SERVICE_CENTERS, SERVICE_RADIUS_MILES } from "./site";
import { checkZip, extractZip, haversineMiles } from "./service-area";
import { SERVICE_AREA_STATES } from "./service-area-cities";
import { GENERATED_FOR, SERVICE_AREA_ZIPS } from "./service-area-zips";

describe("checkZip", () => {
  it.each(["20001", "22201", "22030", "20850", "22401", "22554", "20110", "20186", "22601", "20814", "20735", "20910", "20877", "20770", "20721"])("%s is in area", (zip) => {
    expect(checkZip(zip)).toBe("in");
  });

  it.each(["21201", "20707", "21701", "22701", "23005", "25414", "25446", "90210", "10001"])("%s is out of area", (zip) => {
    expect(checkZip(zip)).toBe("out");
  });

  it.each(["", "2000", "200011", "abcde", "20 001", "20001-1234"])("%j is invalid", (zip) => {
    expect(checkZip(zip)).toBe("invalid");
  });

  it("trims whitespace", () => {
    expect(checkZip(" 20001 ")).toBe("in");
  });
});

describe("extractZip", () => {
  it("finds a bare ZIP", () => {
    expect(extractZip("22030")).toBe("22030");
  });

  it("uses the ZIP at the end of a street address, not the house number", () => {
    expect(extractZip("12345 Main St, Fairfax VA 22030")).toBe("22030");
  });

  it("ignores digit runs longer or shorter than 5", () => {
    expect(extractZip("123456 Oak Ave")).toBeNull();
    expect(extractZip("1234 Oak Ave")).toBeNull();
  });

  it("returns null when there is no ZIP", () => {
    expect(extractZip("Fairfax, VA")).toBeNull();
  });
});

describe("generated service-area list", () => {
  it("was built for the configured centers and radius", () => {
    expect(GENERATED_FOR).toEqual({ centers: SERVICE_CENTERS, radiusMiles: SERVICE_RADIUS_MILES });
  });

  it("is a sane size", () => {
    expect(SERVICE_AREA_ZIPS.size).toBeGreaterThan(200);
    expect(SERVICE_AREA_ZIPS.size).toBeLessThan(1000);
  });
});

describe("service-area city list", () => {
  it("covers exactly the ZIPs in the ZIP list", () => {
    const fromCities = SERVICE_AREA_STATES.flatMap((s) => s.cities.flatMap((c) => c.zips));
    expect(new Set(fromCities)).toEqual(new Set(SERVICE_AREA_ZIPS));
    expect(fromCities.length).toBe(SERVICE_AREA_ZIPS.size);
  });
});

describe("haversineMiles", () => {
  it("is zero for the same point", () => {
    expect(haversineMiles(SERVICE_CENTERS[0], SERVICE_CENTERS[0])).toBe(0);
  });

  it("Fredericksburg to Manassas is roughly 33 miles", () => {
    const d = haversineMiles(SERVICE_CENTERS[0], SERVICE_CENTERS[2]);
    expect(d).toBeGreaterThan(28);
    expect(d).toBeLessThan(38);
  });
});
