export interface IListDTO {
    filters: Map<string, any>
}

export default class ListDTO {
    public readonly filters: Map<string, any>

    private constructor({ filters }: IListDTO) {
        this.filters = filters
    }

    public static handle(qs: any) {
        const filters = new Map<string, any>()

        for (const [key, value] of Object.entries(qs)) {
            if(value !== undefined) filters.set(key, value)
        }

        return new ListDTO({ filters })
    }
}