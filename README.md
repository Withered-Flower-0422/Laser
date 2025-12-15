# Laser Package

This package contains the Laser-related Items for Ballex² and BME pro HDRP.

[![](https://img.shields.io/badge/Steam-Ballex%C2%B2:%20The%20Hanging%20Gardens-235?style=flat)](https://store.steampowered.com/app/1383570/)
[![](<https://img.shields.io/badge/Steam-Ballex%C2%B2%20--%20Map%20Editor%20(BME%20Pro)-235?style=flat>)](https://store.steampowered.com/app/1809190/)

[![](https://img.shields.io/badge/QQ%20Group-797934847-09f?style=flat)](https://qm.qq.com/q/2mIPnK8JIk)
[![](https://img.shields.io/badge/Discord-5NygdBmksE-56e?style=flat)](https://discord.gg/5NygdBmksE/)

[![](https://img.shields.io/github/license/Withered-Flower-0422/Laser)](https://github.com/Withered-Flower-0422/Laser/blob/main/LICENSE)

> [!IMPORTANT]
> The package is currently not uploaded. It will be available in the near future when more performance tests are done and `Unpack Assets` is ready.

## Usage

### Installation

Click `File → Unpack Assets` in the menu bar to install the package, then restart BME.

### Enabling Laser

Click `Scripts → Enable Laser` in the menu bar to enable the Laser system for the current scene.

### Tags

Tags only work for **non-link** items.

-   `AffectedByLaserForce`: Only a **rigid** item with this tag can be affected by the laser force.
-   `ReflectLaser`: An item with this tag will reflect the laser.
-   `IgnoreLaser`: An item with this tag will be ignored by the laser.

> [!WARNING]
> The laser system has occupied the `LaserInstances` variable name in the `variables` module.
> **TRY NOT** to use this variable name in your own scripts, nor to call `variables.clear()`.

## Items

### Balls

Same as the official balls, but affected by the laser force. The `SteelBall` also reflects the laser specially.

### Box

Same as the official box, but affected by the laser force.

### Steel_Block

A rigid steel block that is affected by the laser force, as well as reflecting the laser.

### Ice_Block

A rigid ice block that is ignored by the laser.

### DoublePushBoard_TypeA

Same as the official `DoublePushBoard_TypeA`, but affected by the laser force.

### DoublePushBoard_TypeB

Same as the official `DoublePushBoard_TypeB`, but affected by the laser force.

### Fence

Same as the official fence, but affected by the laser force.

### PushBoard

Same as the official push board, but affected by the laser force.

### TBoard

Same as the official TBoard, but affected by the laser force.

### Steel_Board

A rotatable steel board that can reflect the laser.

### TNT

Basically the same as the official TNT (cannot interact with official machineries, e.g. blowing up the suspension bridge), explodes when hit by the laser, received a strong impact or touched by the player ball with high temperature.

#### Configuration

| Variable                |  Type   |   Default   | Description                                                                             |
| ----------------------- | :-----: | :---------: | :-------------------------------------------------------------------------------------- |
| `explodeImpulseRequire` |  float  |      5      | The minimum impulse required to explode the TNT.                                        |
| `explodeTempRequire`    |  float  |     200     | The minimum temperature required to explode the TNT.                                    |
| `explodeForce`          |  float  |     30      | The force applied to the items around the exploded TNT.                                 |
| `range`                 |  float  |      5      | The range of the explosion. Items within this radius will be affected by the explosion. |
| `damageTable`           | float[] | _see below_ | The damage inflicted on player if player is blown up by the TNT.                        |

#### Damage Table

The damage inflicted on player depends on the player's ball type.

| Index | Corresponding Ball Type | Default |
| :---: | :---------------------: | :-----: |
|   0   |       WoodenBall        |   10    |
|   1   |        StoneBall        |    5    |
|   2   |        PaperBall        |   40    |
|   3   |         IceBall         |   15    |
|   4   |        SteelBall        |   2.5   |
|   5   |       RubberBall        |    8    |
|   6   |       BalloonBall       |   100   |
|   7   |       StickyBall        |   15    |
|   8   |       SpongeBall        |    0    |
|   9   |         Others          |   10    |

### LaserLockedDoor

Same as the official `LaserLockedDoor` in Ballex1.

#### Configuration

The first element of `Tags` in `Settings` component means the duration (in frames) for
which the laser door opens after being hit by the laser, defaults to `100`.

### LaserLockedDoor_Joint

The door will open permanently after being hit by the laser.

> [!TIP]
> To make the door be affected by the laser force, add the `AffectedByLaserForce` tag to the `Door_Left` and `Door_Right` sub-items.

#### Configuration

If there is a `ResetOnDeath` tag in `Tags` in `Settings` component, the door will
be locked again after the player dies. Otherwise, it will remain unlocked (if it had been unlocked before).

### Laser

A pure laser that always emits laser rays in the positive z-axis direction of its own coordinate system.

#### Configuration

| Variable             |      Type      |       Default       | Description                                                                                                                                                                                                              |
| -------------------- | :------------: | :-----------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `maxDistance`        |     float      |         30          | The maximum distance that the laser can travel before stopping.                                                                                                                                                          |
| `force`              | [float, float] |      [0.5, 1]       | The linear (first element) and angular (second element) forces applied to the **rigid** items **with `AffectedByLaserForce` tag** hit by the laser.                                                                      |
| `damageTable`        |    float[]     |     _see below_     | The damage inflicted on player per frame if player is hit by the laser.                                                                                                                                                  |
| `heatFactor`         |     float      |          2          | The temperature added to the player per frame if player is hit by the laser.                                                                                                                                             |
| `chargeFactor`       |     float      |         0.5         | The power added to the player per frame if player is hit by the laser.                                                                                                                                                   |
| `dryFactor`          |     float      |         0.5         | The humidity subtracted from the player per frame if player is hit by the laser.                                                                                                                                         |
| `material`           | AssetReference | SwitcherGlow_Purple | The material of the laser rays.                                                                                                                                                                                          |
| `thickness`          |     float      |          1          | The thickness factor of the laser rays.                                                                                                                                                                                  |
| `stopUpdateDistance` |     float      |         50          | If the distance between the laser and the player is larger than this value, the laser will stop being updated. If the value is negative, the laser will always be updated. _This is for sake of optimizing performance._ |
| `halfSample`         |      bool      |        true         | If true, the laser will be updated every other frame. _This is for sake of optimizing performance_.                                                                                                                      |
| `asRepeater`         |      bool      |        false        | If true, the laser won't emit rays unless itself is hit by any laser ray.                                                                                                                                                |
| `bake`               |      bool      |        false        | If true, the laser will be baked and never be updated or affect other items during gameplay. _This is for decoration._                                                                                                   |

#### Damage Table

The damage inflicted on player depends on the player's ball type.

| Index | Corresponding Ball Type | Default |
| :---: | :---------------------: | :-----: |
|   0   |       WoodenBall        |   0.3   |
|   1   |        StoneBall        |   0.1   |
|   2   |        PaperBall        |   100   |
|   3   |         IceBall         |    0    |
|   4   |        SteelBall        |  0.025  |
|   5   |       RubberBall        |   0.3   |
|   6   |       BalloonBall       |   100   |
|   7   |       StickyBall        |  0.125  |
|   8   |       SpongeBall        |    0    |
|   9   |         Others          |  0.25   |

### Laser_Static

A static laser that emits laser rays in the positive z-axis direction of its own coordinate system.
You can configure the laser in `Laser_Head` sub-item.

### Laser_Rotating

Same as `Laser_Static`, but continuously rotates around its own y-axis.

#### Configuration

| Variable      | Type  | Default | Description                                 |
| ------------- | :---: | :-----: | :------------------------------------------ |
| `rotateSpeed` | float |  0.25   | The speed of rotation in degrees per frame. |

### Laser_Rotatable

Same as `Laser_Static`, but can be rotated.

### Laser_Rotatable_ShortHandle

Same as `Laser_Rotatable`, but with a shorter handle.

### Repeaters

The repeater versions of the laser.

#### Features

`Self-supplying` : If the repeater is hit by its own laser ray, it can still emit rays.

## Notes

-   The `Laser` items are quite "heavy", so use them sparingly.
-   Try not to use `Laser_Rotating` excessively. Static lasers have cache mechanisms to ensure their performance, but an always-rotating laser cannot enjoy the same benefits.
-   Try not to let the laser reflect excessively. Reflecting consumptions are quite high.
-   It is recommended to arrange no more than four lasers within a section, as the performance may degrade significantly.
-   Extend the distance between sections which have lasers as much as possible so that the lasers in previous sections don't get updated (if `stopUpdateDistance` works) to optimize performance.

## License

This package is under the [MIT](https://github.com/Withered-Flower-0422/Laser/blob/main/LICENSE) license.
