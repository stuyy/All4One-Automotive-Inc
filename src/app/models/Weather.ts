export default interface Weather {
    coords: Object;
    weather: Array<Object>;
    base: string;
    main: any;
    visibility: number;
    wind: Object;
    rain: Object;
    clouds: Object;
    dt: number;
    sys: Object;
    timezone: number;
    id: number;
    name: string;
    cod: number;
}