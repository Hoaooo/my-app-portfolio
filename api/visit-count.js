// api/visit-count.js
import { createClient } from '@supabase/supabase-js'

// 初始化 Supabase 客户端
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY

// 检查环境变量
if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req, res) {
  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  // 处理预检请求
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method === 'GET') {
    try {
      // 获取当前访问次数
      const { data, error } = await supabase
        .from('visit_counts')
        .select('count')
        .eq('id', 1)
        .single()

      if (error) {
        console.error('Supabase error (GET):', error)
        return res.status(500).json({
          success: false,
          error: '获取访问次数失败',
          details: error.message
        })
      }

      return res.status(200).json({
        success: true,
        count: data ? data.count : 0
      })
    } catch (error) {
      console.error('Server error (GET):', error)
      return res.status(500).json({
        success: false,
        error: '服务器错误'
      })
    }
  }

  if (req.method === 'POST') {
    try {
      // 获取客户端信息（可选）
      const userAgent = req.headers['user-agent']
      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
      const referrer = req.headers['referer']

      // 记录访问详情（可选）
      if (process.env.NODE_ENV === 'production') {
        await supabase
          .from('visit_details')
          .insert([
            {
              user_agent: userAgent,
              ip_address: ip,
              referrer: referrer
            }
          ])
      }

      // 增加访问次数
      const { data: count, error } = await supabase.rpc('increment_visit_count')

      if (error) {
        console.error('Supabase error (POST):', error)
        return res.status(500).json({
          success: false,
          error: '更新访问次数失败',
          details: error.message
        })
      }

      return res.status(200).json({
        success: true,
        count: count
      })
    } catch (error) {
      console.error('Server error (POST):', error)
      return res.status(500).json({
        success: false,
        error: '服务器错误'
      })
    }
  }

  // 不支持的方法
  return res.status(405).json({ 
    success: false, 
    error: '方法不允许' 
  })
}
