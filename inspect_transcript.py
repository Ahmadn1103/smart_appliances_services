import json

transcript_path = r"C:\Users\ahmad\.cursor\projects\c-Users-ahmad-OneDrive-Desktop-Elegacy-Smart-Applaince-Services-site-smart-appliance-services\agent-transcripts\1ecd6349-a290-47a9-8afb-4d4647dd2a36\1ecd6349-a290-47a9-8afb-4d4647dd2a36.jsonl"

navbar_versions = []
with open(transcript_path, "r", encoding="utf-8", errors="ignore") as f:
    for line in f:
        if "Navbar.tsx" in line:
            try:
                data = json.loads(line)
                # search recursively for string containing contents of Navbar.tsx
                s = json.dumps(data)
                if "export default function Navbar" in s:
                    navbar_versions.append(s)
            except Exception as e:
                pass

print(f"Found {len(navbar_versions)} matches")
if navbar_versions:
    # Print the earliest one and the latest one
    print("--- FIRST MATCH SNIPPET ---")
    print(navbar_versions[0][:1500])
