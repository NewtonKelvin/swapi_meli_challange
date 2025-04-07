import usePagination from '@mui/material/usePagination'
import { ChangeEvent } from 'react'
import { CustomButton, List, Nav } from './styles'

interface IPagination {
  current: number,
  total: number,
  setCurrent: (e: ChangeEvent<unknown>, newPage: number) => void
}

const Pagination = ({ current, total, setCurrent }: IPagination) => {
  const { items } = usePagination({
    count: total,
    page: current,
    defaultPage: 1,
    onChange: setCurrent,
    boundaryCount: 1,
    siblingCount: 1,
    hideNextButton: true,
    hidePrevButton: true,
    showFirstButton: false,
    showLastButton: false
  })

  return (
    <Nav>
      <List>
        <CustomButton
          key='first'
          disabled={current === 1}
          onClick={(e) => setCurrent(e, 1)}
        >
          {'<<'}
        </CustomButton>
        <CustomButton
          key='previous'
          disabled={current === 1}
          onClick={(e) => setCurrent(e, current - 1)}
        >
          {'<'}
        </CustomButton>
        {
          items.map(({ page, type, selected, ...item }, index) => {
            if (!page) return
            let children = null
            const firstOrLast = current === 1 || current === total
            const range = firstOrLast ? 3 : 2
            const outOfRange = (page <= current - range || page >= current + range)
            if (
              ['start-ellipsis', 'end-ellipsis'].includes(type) ||
              outOfRange
            ) {
              children = null
            } else if (type === 'page') {
              children = (
                <CustomButton
                  type="button"
                  style={{
                    fontWeight: selected ? 'bold' : undefined,
                  }}
                  $active={page === current}
                  {...item}
                >
                  {page}
                </CustomButton>
              )
            } else {
              children = (
                <CustomButton type="button" {...item}>
                  {type}
                </CustomButton>
              )
            }
            if (children) return <li key={index}>{children}</li>
          })
        }
        <CustomButton
          key='next'
          onClick={(e) => setCurrent(e, current + 1)}
          disabled={current > total - 1}
        >
          {'>'}
        </CustomButton>
        <CustomButton
          key='last'
          onClick={(e) => setCurrent(e, total)}
          disabled={current === total}
        >
          {'>>'}
        </CustomButton>
      </List >
    </Nav >
  )
}

export default Pagination