import Redis from 'ioredis'

const redis = new Redis(
  `rediss://default:${process.env.REDIS_SECRET}@magical-arachnid-73383.upstash.io:6379`,
)

const res = await redis.ping()

async function testConnection() {
  try {
    const res = await redis.ping()
    if (res === 'PONG') {
      console.log('✅ Upstash Redis connection successful!')
    }
  } catch (error) {
    console.error('❌ Upstash Redis connection failed:', error)
  }
}

testConnection()

export default redis
