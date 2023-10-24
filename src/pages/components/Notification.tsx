import { NotificationContainer } from '@/styles/components/notification'
import { Check } from 'phosphor-react'

export function Notification() {
  return (
    <NotificationContainer>
      <Check size={24} />
      <span>Produto colocado na sacola!</span>
    </NotificationContainer>
  )
}
