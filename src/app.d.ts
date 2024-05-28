// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
		interface Fn<T = any, R = T> {
			(...arg: T[]): R
		}
		type FunctionKeys<T> = {
			[K in keyof T]: T[K] extends (...args: any[]) => any ? K : never
		}[keyof T]
		type ExtractUndefinedOrArrayItem<T> = T extends (infer U)[] ? U : never
		type ExtractFnParams<T> = T extends (...args: (infer U)[]) => any ? U : never

		type NonUndefined<T> = Exclude<T, undefined>;

		type Values<T> = T[keyof T];
	}
}

export {};
