import Home from '../Home'

jest.mock('../../services/ItemService', () => ({
	getItems: () => [],
}))

describe('<Home />', () => {
	test.todo('')
})
