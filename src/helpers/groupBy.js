export default function groupBy(list, keyGetter){
	const map = new Map();
	list.forEach((item) => {
		const key = keyGetter(item);
		const collection = map.get(key);
		if(!collection) {
			map.set(key, parseFloat(item.cost))
		} else {
			map.set(key, collection + parseFloat(item.cost))
		}
	});
	return Array.from(map.values());
}
