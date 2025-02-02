const DEFAULT_COMMIT_TYPES = [
  'feat',
  'fix',
  'docs',
  'style',
  'refactor',
  'test',
  'build',
  'perf',
  'ci',
  'chore',
  'revert',
  'merge',
  'wip',
]

const isValidCommitMessage = (message: string, availableTypes: string[] = DEFAULT_COMMIT_TYPES): boolean => {
  // Exceptions.
  // This is a message that's auto-generated by git. Can't do much about it unfortunately. Let's allow it.
  if (message.startsWith('Merge ') || message.startsWith('Revert ')) {
    return true
  }

  // Commit message doesn't fall into the exceptions group. Let's do the validation.
  const commitTypePrefix = message.split(':')[0].toLowerCase()
  const commitTypePrefixWithoutAlphaOrScope = removeNonAlphaChars(removeScope(commitTypePrefix))
  return availableTypes.includes(commitTypePrefixWithoutAlphaOrScope)
}

function removeScope(message: string): string {
  const scopeRegex = /\(\S*?\)/
  return message.match(scopeRegex) ? message.replace(scopeRegex, '') : message
}

function removeNonAlphaChars(message: string): string {
  return message.replace(/[^a-z0-9]/g, '')
}

export default isValidCommitMessage
