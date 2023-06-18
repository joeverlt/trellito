import { useEffect, useState } from 'react'
import { Droppable as Dropp, DroppableProps } from 'react-beautiful-dnd'

export const Droppable: React.FC<DroppableProps> = ({ children, ...props }) => {
  const [enabled, setEnabled] = useState<boolean>(false)
  useEffect(() => {
    const animation: number = requestAnimationFrame(() => setEnabled(true))
    return () => {
      cancelAnimationFrame(animation)
      setEnabled(false)
    }
  }, [])
  if (!enabled) return null

  return <Dropp {...props}>{children}</Dropp>
}
