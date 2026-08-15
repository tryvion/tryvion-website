type ClassValue = string | undefined | null | false | 0 | bigint | ClassValue[]

function flattenClasses(classes: ClassValue[]): string[] {
  return classes.flatMap((value) => {
    if (Array.isArray(value)) {
      return flattenClasses(value)
    }

    return value ? [String(value)] : []
  })
}

export function cn(...classes: ClassValue[]): string {
  return flattenClasses(classes).join(" ")
}
