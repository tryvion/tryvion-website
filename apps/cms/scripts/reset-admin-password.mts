const { default: configPromise } = await import('../src/payload.config.ts')
const { getPayload } = await import('payload')

const main = async () => {
  const config = await configPromise
  const payload = await getPayload({ config })

  const email = 'tryvion2026@gmail.com'
  const newPassword = 'Futureisachoice123#@!'

  const result = await payload.update({
    collection: 'users',
    id: 1,
    overrideAccess: true,
    data: {
      password: newPassword,
    },
  })

  console.log(`Password reset successfully for: ${result.email}`)

  process.exit(0)
}

main().catch((error) => {
  console.error('Password reset failed:', error)
  process.exit(1)
})
