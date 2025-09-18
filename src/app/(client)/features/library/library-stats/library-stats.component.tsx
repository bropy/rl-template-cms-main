import { type FC } from 'react'

import { Card, CardBody } from '@heroui/card'
import { cn } from '@heroui/react'

import { libraryStats } from './constant'

// interface
interface IProps {
  className?: string
}

// component
const LibraryStatsComponent: FC<Readonly<IProps>> = (props) => {
  const { className } = props

  // return
  return (
    <section className={cn('w-full', className)}>
      <div className='mb-8 text-center'>
        <h2 className='text-foreground mb-2 text-3xl font-bold'>Library at a Glance</h2>
        <p className='text-foreground/70 text-lg'>Discover the scale and impact of our growing library community</p>
      </div>

      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        {libraryStats.map((stat) => (
          <Card key={stat.id} className='group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg'>
            <CardBody className='p-6 text-center'>
              <div className='mb-4 text-4xl transition-transform duration-300 group-hover:scale-110'>{stat.icon}</div>

              <div className='mb-2'>
                <h3 className='text-foreground mb-1 text-3xl font-bold'>{stat.value}</h3>

                <p className='text-foreground/80 text-lg font-medium'>{stat.label}</p>
              </div>

              <p className='text-foreground/60 mb-3 text-sm'>{stat.description}</p>

              {stat.trend && (
                <div className='flex items-center justify-center gap-1'>
                  <span className={cn('text-sm font-medium', stat.trend.isPositive ? 'text-success' : 'text-danger')}>
                    {stat.trend.isPositive ? '↗' : '↘'} {stat.trend.value}
                  </span>

                  <span className='text-foreground/60 text-xs'>this month</span>
                </div>
              )}
            </CardBody>
          </Card>
        ))}
      </div>

      <div className='from-primary/10 to-secondary/10 mt-12 rounded-2xl bg-gradient-to-r p-8'>
        <div className='mx-auto max-w-4xl text-center'>
          <h3 className='text-foreground mb-4 text-2xl font-bold'>Join Our Growing Community</h3>

          <p className='text-foreground/70 mb-6 text-lg'>
            Be part of a vibrant community of readers, researchers, and learners. Our library offers both physical and
            digital resources to support your journey of discovery.
          </p>

          <div className='mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3'>
            <div className='text-center'>
              <div className='mb-2 text-2xl'>🕒</div>

              <h4 className='text-foreground mb-1 font-semibold'>24/7 Digital Access</h4>

              <p className='text-foreground/60 text-sm'>Access e-books and resources anytime</p>
            </div>

            <div className='text-center'>
              <div className='mb-2 text-2xl'>🎯</div>

              <h4 className='text-foreground mb-1 font-semibold'>Personalized Recommendations</h4>

              <p className='text-foreground/60 text-sm'>AI-powered book suggestions</p>
            </div>

            <div className='text-center'>
              <div className='mb-2 text-2xl'>🏆</div>

              <h4 className='text-foreground mb-1 font-semibold'>Reading Challenges</h4>

              <p className='text-foreground/60 text-sm'>Join monthly reading goals</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LibraryStatsComponent
