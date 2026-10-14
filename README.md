# MOLT / Tunnel Machine

**[Play MOLT](https://tront.xyz/molt/)**

A robotic snake digging sandbox powered by Rust, WebAssembly, and WebGPU.
**v0.3 — Eat. Evolve. Survive.** Eat cyan ore, grow from 12 to 36 segments, and choose speed, jaw, or blast upgrades. Ignite pink seams to chain explosions, collapse rock, and rupture reservoirs. Blast ore into falling green nuggets, then swallow the rubble to fund your next evolution.

The rig and world now share a crisp pixel grid and a quieter palette. Rock resists the drill; boost builds heat, water cools, and ore repairs your hull. Lava, nearby chained bursts, and sustained overheating can wreck the rig. Rebuild for half your unspent ore while keeping installed upgrades and terrain changes.

This repository contains the compiled browser distribution. Development source is maintained separately.

## Controls

| Input | Action |
| --- | --- |
| WASD / arrows | Steer and dig |
| Left mouse | Dig toward cursor |
| Space | Boost / build heat |
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
| R (after a wreck) | Rebuild at spawn for half your unspent ore |

Requires a desktop browser with WebGPU and hardware acceleration. Click the game for keyboard focus. Saves live in this browser's IndexedDB; press F5 and wait for WORLD SAVED before closing. Purchases, wrecks, rebuilds, and chunk streaming also save automatically. Localhost saves do not transfer automatically to the hosted game. Ore, upgrades, hull, and heat persist; the player respawns at the starting cavern after reloading. Version 0.3 continues your v0.2 world and upgrades. Old v0.1 worlds remain stored separately.

This is an early sandbox prototype. Distant chunks stop simulating, streaming may briefly pause, and fluid seams remain visible in some situations.

The Pages workflow publishes only the entry page and runtime package. Pushes to `main` update the public game.
