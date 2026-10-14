# MOLT / Tunnel Machine

**[Play MOLT](https://trentsterling.github.io/molt/)**

A robotic snake digging sandbox powered by Rust, WebAssembly, and WebGPU.
Burrow through sand and rock, breach water reservoirs, pour lava, and detonate tunnels in a procedural pixel world.

This repository contains the compiled browser distribution. Development source is maintained separately.

## Controls

| Input | Action |
| --- | --- |
| WASD / arrows | Steer and dig |
| Left mouse | Dig toward cursor |
| Space | Boost |
| E | Detonate ahead |
| Right mouse | Pour material |
| 1–5 | Sand / water / lava / oil / rock |
| Mouse wheel | Zoom |
| P | Pause / resume |
| H | Help |
| F5 | Save terrain |

Requires a desktop browser with WebGPU and hardware acceleration. Click the game for keyboard focus. Saves live in this browser's local storage (IndexedDB); press F5 and wait for WORLD SAVED before closing. Localhost saves do not transfer automatically to the hosted game. The player respawns at the starting cavern after reloading.

This is an early sandbox prototype. Distant chunks stop simulating, streaming may briefly pause, and fluid seams remain visible in some situations.

The Pages workflow publishes only the entry page and runtime package. Pushes to `main` update the public game.
