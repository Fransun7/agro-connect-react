import {useFetch} from `./useFetch`;

export function authorBook () {
    const [data, loading, error] = useFetch("https://bookapi.co/api/v2/authorBook");

    if (loading) {
        return <h2>fetching author book from the server</h2>
    }

    if (error) {
        return <h2>Oops! Something went wrong</h2>
    }
}