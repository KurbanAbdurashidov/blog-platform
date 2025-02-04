import { format } from 'date-fns'

export const formatDate = (date: string): string => {
	return format(new Date(date), 'MMMM dd, yyyy')
}

export const formatDescription = (desc: string): string => {
	if (desc.length > 250) {
		return `${desc.slice(0, 250).trim()}...`
	}
	return desc.trim()
}

export const formatUsername = (username: string): string => {
	if (username.length > 10) {
		return `${username.slice(0, 10).trim()}...`
	}
	return username.trim()
}

export const formatTitle = (title: string): string => {
	if (title.length > 30) {
		return `${title.slice(0, 30).trim()}...`
	}
	return title.trim()
}

export const formatTag = (tag: string): string => {
	if (tag.length > 10) {
		return `${tag.slice(0, 10).trim()}...`
	}
	return tag.trim()
}

export const formatTagList = (tagList: string[] | null): string[] => {
	if (!tagList) return []
	if (tagList.length > 4) {
		return tagList.slice(0, 4)
	}
	return tagList
}

export const newTagList = (data: { tag: string }[]) => {
	return data.map((obj) => Object.values(obj))
}
