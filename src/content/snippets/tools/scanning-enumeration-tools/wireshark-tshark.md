---
title: "Wireshark & tshark: packet capture and analysis"
description: "GUI and CLI packet analysis."
pubDate: 2026-11-10
category: "Cybersecurity"
source: "INE Certification"
lang: "bash"
tags: ["wireshark", "tshark", "packet-analysis"]
draft: false
---

Wireshark is the GUI protocol analyzer; `tshark` is the same engine from the command line, which is what you want over SSH or inside a script. Both understand the same display-filter syntax.

## Wireshark

```bash
wireshark -i eth0                    # capture on a specific interface
wireshark -i eth0 -w capture.pcap    # capture and save
wireshark -r capture.pcap            # open a saved capture
```

Display filters (typed into the filter bar, or passed to tshark with `-Y`):

| Filter | Shows |
| --- | --- |
| `http` | HTTP traffic |
| `ip.addr == 192.168.1.1` | Traffic to/from one IP |
| `tcp.port == 443` | Traffic on one TCP port |

## tshark

```bash
tshark -r capture.pcap -c 100                          # first 100 packets
tshark -r capture.pcap -q -z io,phs                     # protocol hierarchy statistics
tshark -r capture.pcap -Y "http.request"                # only HTTP GET/POST requests
tshark -r capture.pcap -Y "http" -T fields -e frame.time -e ip.src -e http.request.full_uri
tshark -r capture.pcap -Y "frame contains \"<string>\""  # search packet contents for a string
tshark -r capture.pcap -Y "ip.addr == <ip>"
tshark -r capture.pcap -Y "http.cookie contains \"sessionid\""   # check session IDs
tshark -r capture.pcap -Y "http.user_agent"
```

## Wireless filters

```bash
tshark -r capture.pcap -Y "wlan"
tshark -r capture.pcap -Y "wlan.fc.type_subtype == 0x000c"   # deauthentication frames only
tshark -r capture.pcap -Y "eapol"                             # WPA handshake packets only
tshark -r capture.pcap -T fields -e wlan.ssid -e wlan.bssid
```

## Capture vs display filters

| Type | Flag | Applied |
| --- | --- | --- |
| Capture filter | `-f` (e.g. `-f "port 80"`) | While capturing, reduces noise |
| Display filter | `-Y` in tshark, filter bar in Wireshark | On an already-captured file |

:::warning[Authorization and promiscuous mode]
Promiscuous mode is on by default and captures all traffic the interface can see, not just your own. Always confirm you have authorization to capture on a given network segment before you start.
:::

## Related

- [SMB relay attack](/snippets/cybersecurity/exploitation/remote-service-exploitation/smb-relay-attack): intercepting NTLM traffic on the wire
- [Host discovery & network mapping workflow](/snippets/cybersecurity/enumeration-recon/host-discovery-network-mapping): where packet-level visibility helps during recon
- [Nmap](/snippets/cybersecurity/tools/scanning-enumeration-tools/nmap): active scanning to compare against what you captured
