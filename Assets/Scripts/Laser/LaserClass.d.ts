import { Float3 } from "gameApi";
import type { Item, MaterialPath, Player } from "game:alias";
export declare const createHurtUI: () => import("game:type").UIElement<"Panel">;
export interface RayData {
    readonly startPos: Float3;
    /** As well as the position where the item is hit. */
    readonly endPos: Float3;
    readonly castItem: Item | null;
}
export declare class Ray implements RayData {
    private _startPos;
    get startPos(): Float3;
    private _endPos;
    get endPos(): Float3;
    private _castItem;
    get castItem(): Item | null;
    private _enabled;
    get enabled(): boolean;
    private _destroyed;
    get destroyed(): boolean;
    private readonly rayItem;
    /**
     * Creates a `Ray` instance.
     * @param startPos - The start position of the ray.
     * @param endPos - The end position of the ray.
     * @param castItem - The cast item of the ray.
     * @param thickness - The thickness of the ray.
     * @param material - The material of the ray.
     */
    constructor(startPos: Float3, endPos: Float3, castItem: Item | null, thickness: float, material: MaterialPath);
    /**
     * Checks whether the item or player is casted by the ray.
     * @param item - The item or player to check.
     * @returns Whether the item or player is casted by the ray.
     */
    isCasted(item: Item | Player): boolean;
    /**
     * Checks whether the ray has the same start and end position with the given positions.
     * If the ray is disabled or destroyed, it will always return false.
     * @param startPos - The start position.
     * @param endPos - The end position.
     * @param threshold - The threshold of the distance, defaults to 1e-3.
     * @returns Whether the ray has the same start and end position with the given positions.
     */
    hasSameStartAndEndPos(startPos: Float3, endPos: Float3, threshold?: float): boolean;
    /**
     * Updates the cast item of the ray.
     * @param castItem - The new cast item of the ray.
     * @returns
     */
    updateCastItem(castItem: Item | null): void;
    /**
     * Enables the ray, updates its data and sets its transform.
     * @param startPos - The new start position of the ray.
     * @param endPos - The new end position of the ray.
     * @param castItem - The new cast item of the ray.
     * @param thickness - The new thickness of the ray.
     * @returns
     */
    enable(startPos: Float3, endPos: Float3, castItem: Item | null, thickness: float): void;
    /**
     * Disables the ray and sets its scale to 0 to make it invisible.
     * @returns
     */
    disable(): void;
    /**
     * Destroys the ray and removes it from the scene.
     * @returns
     */
    destroy(): void;
}
export declare class Laser {
    readonly material: MaterialPath;
    private static instances;
    /**
     * Checks whether the item or player is casted by any laser.
     * @param item - The item or player to check.
     * @param excludeLasers - The lasers to exclude.
     * @returns Whether the item or player is casted by any laser.
     */
    static isCasted(item: Item | Player, ...excludeLasers: Laser[]): boolean;
    /**
     * Gets the number of times the item or player is casted by all rays.
     * @param item - The item or player to check.
     * @param excludeLasers - The lasers to exclude.
     * @returns The number of times the item or player is casted by all rays.
     */
    static countCasted(item: Item | Player, ...excludeLasers: Laser[]): number;
    /**
     * Gets the lasers that the item or player is casted by.
     * @param item - The item or player to check.
     * @returns The lasers that the item or player is casted by.
     */
    static getCastedLasers(item: Item | Player): Laser[];
    /**
     * Gets the number of instances of `Laser`.
     * @returns The number of instances of `Laser`.
     */
    static instanceNum(): number;
    private _frozen;
    get frozen(): boolean;
    private readonly rays;
    private readonly hurtUI?;
    readonly tags: readonly string[];
    /**
     * Creates a `Laser` instance.
     * @param material - The material of the rays.
     * @param tags - Tags for the laser, to store extra information, defaults to `[]`.
     * @param enableUI - Whether to enable the hurt UI, defaults to `true`.
     * @param pushToInstances - Whether to push the instance to the instances array, defaults to `true`.
     */
    constructor(material: MaterialPath, tags?: readonly string[], enableUI?: bool, pushToInstances?: bool);
    /**
     * - Updates the rays.
     * - The rays that have the same start and end position with the previous rays will not be updated.
     * - Items with `"IgnoreLaser"` tag will not be affected by the rays.
     * - Items with `"ReflectLaser"` tag will reflect the rays.
     * @param startPos - The start position of the ray.
     * @param vector - The direction of the ray.
     * @param maxDis - The maximum distance of the ray.
     * @param thickness - The thickness of the ray.
     * @returns
     */
    updateRays(startPos: Float3, vector: Float3, maxDis: float, thickness: float): void;
    /**
     * Applies force to the **rigid** items **with `"AffectedByLaserForce"` tag** affected by the rays.
     * @param linearKp - The linear acceleration per frame.
     * @param angularKp - The angular acceleration per frame.
     * @returns
     */
    applyForce(linearKp: float, angularKp: float): void;
    /**
     * Updates the player states if the player is affected by the rays.
     * @param damage - The damage to the player per frame.
     * @param heat - The heat factor to the player per frame.
     * @param charge - The charge factor to the player per frame.
     * @param dry - The dry factor to the player per frame.
     * @param uiAlphaFactor - The UI alpha factor, defaults to `1`.
     * @param uiAnimeSpeed - The UI animation speed, defaults to `1`.
     * @returns
     * @NOTE -
     * If hurt UI is enabled, please call this function in `OnPhysicsUpdate` event to get hurt UI updated.
     */
    updatePlayerStates(damage: float, heat: float, charge: float, dry: float, uiAlphaFactor?: float, uiAnimeSpeed?: float): void;
    /**
     * Checks whether the item or player is casted by this laser.
     * @param item - The item or player to check.
     * @returns Whether the item or player is casted by this laser.
     */
    isCasted(item: Item | Player): boolean;
    /**
     * Gets the number of times the item or player is casted by this laser.
     * @param item - The item or player to check.
     * @returns The number of times the item or player is casted by this laser.
     */
    countCasted(item: Item | Player): number;
    /**
     * Clears all the rays.
     * @returns
     */
    clearRays(): void;
    /**
     * Freezes the laser, which means the rays cannot be updated.
     * @returns
     */
    freeze(): void;
    /**
     * Unfreezes the laser, which means the rays can be updated.
     * @returns
     */
    unfreeze(): void;
}
export default Laser;
