import { ClassValue } from 'clsx'
import { FC, ReactElement, ReactNode } from 'react'

import { Pagination } from '@heroui/pagination'
import { cn } from '@heroui/react'
import { Spinner } from '@heroui/spinner'
import { getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/table'

// interface
interface IProps {
  isLoading?: boolean
  isHeaderSticky?: boolean
  hideHeader?: boolean
  title?: string
  data?: {
    [key: string]: ReactNode | ReactElement
    id: string | number
  }[]
  pagination?: {
    page: number
    pages: number
    setPage: (page: number) => void
  }
  columns: { label?: string; key: string }[]
  wrapperClassName?: string
  shadow?: 'none' | 'sm' | 'md' | 'lg'
  emptyContent?: string
  columnClassName?: (columnKey: string) => ClassValue[]
  cellClassName?: (columnKey: string) => ClassValue[]
  onColumnClick?: (id: string | number) => void
  onCellClick?: (key: string | number) => void
}

// component
const TableComponent: FC<Readonly<IProps>> = (props) => {
  const {
    isLoading = false,
    title,
    pagination,
    columnClassName,
    data,
    columns,
    cellClassName,
    wrapperClassName,
    hideHeader = false,
    onCellClick,
    onColumnClick,
    isHeaderSticky = true,
    shadow = 'sm',
    emptyContent = 'No data',
  } = props

  // return
  return (
    <div className={'flex flex-col gap-4'}>
      <Table
        isHeaderSticky={isHeaderSticky}
        hideHeader={hideHeader}
        aria-label={'table'}
        shadow={shadow}
        classNames={{
          wrapper: cn('max-h-[calc(100vh-340px)]', wrapperClassName),
          th: 'first-letter:uppercase',
          td: 'text-nowrap',
          base: 'max-w-full',
        }}
        topContent={title && <div className={'-mb-2 text-lg font-semibold'}>{title}</div>}
        topContentPlacement={'outside'}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.key}
              onClick={() => onColumnClick?.(column.key)}
              className={cn('uppercase', columnClassName?.(column.key))}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>

        <TableBody
          items={data || []}
          loadingContent={
            <div className={'bg-background/60 flex h-full w-full items-center justify-center pt-10'}>
              <Spinner variant={'wave'} />
            </div>
          }
          loadingState={isLoading ? 'loading' : 'idle'}
          emptyContent={emptyContent}
        >
          {(item) => (
            <TableRow
              key={item.id}
              onClick={() => onCellClick?.(item.id || '')}
              className={'transition-background hover:bg-zinc-500/10'}
            >
              {(columnKey) => (
                <TableCell className={cn('text-small align-middle', cellClassName?.(columnKey as string))}>
                  {getKeyValue(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {pagination && (
        <Pagination
          page={pagination.page || 1}
          total={pagination.pages || 1}
          onChange={pagination.setPage}
          className={'z-0 mx-auto'}
          size={'sm'}
          isDisabled={!pagination.pages || pagination.pages <= 1}
          color={!pagination.pages || pagination.pages <= 1 || isLoading ? 'default' : 'primary'}
        />
      )}
    </div>
  )
}

export default TableComponent
