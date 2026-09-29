import { describe, expect, it } from "vitest";
import { SERVICE_CENTER, SERVICE_RADIUS_MILES } from "./site";
import { checkZip, extractZip, haversineMiles } from "./service-area";
import { GENERATED_FOR, SERVICE_AREA_ZIPS } from "./service-area-zips";

describe("checkZip", () => {
  it.each(["20001", "22201", "22030", "20850", "21201", "22554"])("%s is in area", (zip) => {
    expect(checkZip(zip)).toBe("in");
  });

  it.each(["21701", "22601", "22701", "90210", "10001"])("%s is out of area", (zip) => {
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
  it("was built for the configured center and radius", () => {
    expect(GENERATED_FOR).toEqual({ ...SERVICE_CENTER, radiusMiles: SERVICE_RADIUS_MILES });
  });

  it("is a sane size", () => {
    expect(SERVICE_AREA_ZIPS.size).toBeGreaterThan(200);
    expect(SERVICE_AREA_ZIPS.size).toBeLessThan(1000);
  });
});

describe("haversineMiles", () => {
  it("is zero for the same point", () => {
    expect(haversineMiles(SERVICE_CENTER, SERVICE_CENTER)).toBe(0);
  });

  it("DC to Baltimore is roughly 35 miles", () => {
    const d = haversineMiles(SERVICE_CENTER, { lat: 39.2904, lng: -76.6122 });
    expect(d).toBeGreaterThan(30);
    expect(d).toBeLessThan(40);
  });
});
