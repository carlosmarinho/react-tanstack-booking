import { ILocation } from "../location/ILocation";

export interface ICity {
    id: number;
    name: string;
    locations: ILocation[]
}