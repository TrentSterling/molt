# MOLT / Tunnel Machine

**[Play MOLT](https://tront.xyz/molt/)**

A robotic snake digging sandbox powered by Rust, WebAssembly, and WebGPU.
**v0.2 — Eat. Evolve. Detonate.** Eat cyan ore, grow from 12 to 36 segments, and choose speed, jaw, or blast upgrades. Ignite pink seams to chain explosions, collapse rock, and rupture reservoirs. Blast ore into falling green nuggets, then swallow the rubble to fund your next evolution.

This repository contains the compiled browser distribution. Development source is maintained separately.

## Controls

| Input | Action |
| --- | --- |
| WASD / arrows | Steer and dig |
| Left mouse | Dig toward cursor |
| Space | Boost |
| E | Pulse blast / ignite pink seams |
| 1-3 or click a card | Choose an upgrade when the ore meter fills |
| Tab | Toggle material lab |
| Right mouse (lab) | Pour material |
| 1-5 (lab) | Sand / water / lava / oil / rock |
| Mouse wheel | Zoom |
| P | Pause / resume |
| H | Help |
| F5 | Save terrain, ore, and upgrades |
| M | Mute / unmute sound |

Requires a desktop browser with WebGPU and hardware acceleration. Click the game for keyboard focus. Saves live in this browser's IndexedDB; press F5 and wait for WORLD SAVED before closing. Purchases and chunk streaming also save automatically. Localhost saves do not transfer automatically to the hosted game. Ore and upgrades persist; the player respawns at the starting cavern after reloading. Version 0.2 starts a new world with ore and volatile seams, keeping old version 0.1 saves separately.

This is an early sandbox prototype. Distant chunks stop simulating, streaming may briefly pause, and fluid seams remain visible in some situations.

The Pages workflow publishes only the entry page and runtime package. Pushes to `main` update the public game.
