---
title: "Wireshark & tshark: packet capture and analysis"
description: "GUI and CLI packet analysis — capture filters, display filters, and common tshark one-liners."
pubDate: 2026-08-01
category: "Cybersecurity"
source: "INE Certification"
lang: "bash"
tags: ["wireshark", "tshark", "packet-analysis"]
draft: false
---

Wireshark is the GUI protocol analyzer; `tshark` is the same engine from the command line, which is what you actually want over SSH or inside a script. Both understand the same display-filter syntax.

```bash
# Wireshark
wireshark -i eth0                    # capture on a specific interface
wireshark -i eth0 -w capture.pcap    # capture and save
wireshark -r capture.pcap            # open a saved capture

# Wireshark display filters (typed into the filter bar, or passed to tshark with -Y)
http
ip.addr == 192.168.1.1
tcp.port == 443
```

```bash
# tshark — same tool, CLI-driven
tshark -r capture.pcap -c 100                          # first 100 packets
tshark -r capture.pcap -q -z io,phs                     # protocol hierarchy statistics
tshark -r capture.pcap -Y "http.request"                # only HTTP GET/POST requests
tshark -r capture.pcap -Y "http" -T fields -e frame.time -e ip.src -e http.request.full_uri
tshark -r capture.pcap -Y "frame contains \"<string>\""  # search packet contents for a string
tshark -r capture.pcap -Y "ip.addr == <ip>"
tshark -r capture.pcap -Y "http.cookie contains \"sessionid\""   # check session IDs
tshark -r capture.pcap -Y "http.user_agent"

# Wireless-specific filters
tshark -r capture.pcap -Y "wlan"
tshark -r capture.pcap -Y "wlan.fc.type_subtype == 0x000c"   # deauthentication frames only
tshark -r capture.pcap -Y "eapol"                             # WPA handshake packets only
tshark -r capture.pcap -T fields -e wlan.ssid -e wlan.bssid
```

Capture filters (`-f`, applied while capturing — e.g. `-f "port 80"`) reduce noise at capture time; display filters (`-Y` in tshark, the filter bar in Wireshark) filter an already-captured file. Promiscuous mode is on by default and will capture all traffic the interface can see, not just traffic to/from your own machine — always confirm you have authorization to capture on a given network segment before you start.
