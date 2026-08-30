const { default: configPromise } = await import('../src/payload.config.ts')
const { getPayload } = await import('payload')

const main = async () => {
  const config = await configPromise
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'users',
    limit: 100,
    overrideAccess: true,
  })

  console.log(
    result.docs.map((user) => ({
      id: user.id,
      email: user.email,
    })),
  )

  process.exit(0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
