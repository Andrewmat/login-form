// artificial delay to emulate requests
export default function delay(time = 500) {
	return new Promise(resolve => setTimeout(resolve, time))
}
