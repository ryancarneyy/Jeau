const FetchStores = async (stores, setStores) => {
    await fetch('http://localhost:8000/api/stores/getStores', {
        method: 'GET'
    })
    .then(res => {
        if(!res.ok) {
            throw new Error(`Error fetching stores: ${res.status}`);
        }
        return res.json();
    })
    .then(data => {
        setStores(data.stores);
        console.log(data.stores);
    })
    .catch(err => {
        console.error('Error while trying to fetch participating stores');
    })
}

export default FetchStores;