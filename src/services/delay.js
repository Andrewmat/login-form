// artificial delay to emulate requests
export default async function delay(time = 500) {
	return new Promise(resolve => {
		resolve()
	}, time)
}
