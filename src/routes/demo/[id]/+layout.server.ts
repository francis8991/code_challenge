import { examplesOptions } from '@/routes/options'

export function load({ params }) {
	return {
		data: examplesOptions?.[Number(params.id) - 1],
    index: Number(params.id)
	};
}