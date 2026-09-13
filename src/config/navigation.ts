import {
	BookOpen,
	Users,
	CalendarDays,
	BookMarked,
	Star,
	MonitorPlay,
	Clapperboard,
	PlayCircle,
	type LucideIcon,
} from 'lucide-react'

export interface NavigationItem {
	key: string // 用于翻译键，如 'codes' -> t('nav.codes')
	path: string // URL 路径，如 '/codes'
	icon: LucideIcon // Lucide 图标组件
	isContentType: boolean // 是否对应 content/ 目录
}

// 导航配置（Crew Girl 内容分类，与 content/ 文章目录及 en.json nav 键一一对应）
export const NAVIGATION_CONFIG: NavigationItem[] = [
	{ key: 'guide', path: '/guide', icon: BookOpen, isContentType: true },
	{ key: 'cast', path: '/cast', icon: Users, isContentType: true },
	{ key: 'release', path: '/release', icon: CalendarDays, isContentType: true },
	{ key: 'story', path: '/story', icon: BookMarked, isContentType: true },
	{ key: 'reviews', path: '/reviews', icon: Star, isContentType: true },
	{ key: 'streaming', path: '/streaming', icon: MonitorPlay, isContentType: true },
	{ key: 'filming', path: '/filming', icon: Clapperboard, isContentType: true },
	{ key: 'trailer', path: '/trailer', icon: PlayCircle, isContentType: true },
]

// 从配置派生内容类型列表（用于路由和内容加载）
export const CONTENT_TYPES = NAVIGATION_CONFIG.filter((item) => item.isContentType).map(
	(item) => item.path.slice(1),
) // 移除开头的 '/' -> ['codes', 'build', 'combat', 'guides']

export type ContentType = (typeof CONTENT_TYPES)[number]

// 辅助函数：验证内容类型
export function isValidContentType(type: string): type is ContentType {
	return CONTENT_TYPES.includes(type as ContentType)
}
