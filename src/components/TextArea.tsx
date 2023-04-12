import { type FC, type ChangeEvent } from 'react'
import { Form } from 'react-bootstrap'
import { SectionType } from '../types.d'

interface Props {
  placeholder: string
  loading?: boolean
  type: SectionType
  onChange: (value: string) => void
  value: string
}

const commonStyles = { border: 0, height: '200px', resize: 'none' }

const getPlaceholder = ({ type, loading }: { type: SectionType, loading?: boolean }) => {
  if (type === SectionType.From) return 'Introducir texto'
  if (loading === true) return 'Cargando...'
  return 'Traducción'
}

export const TextArea: FC<Props> = ({ type, loading, value, onChange }) => {
  const styles = type === SectionType.From
    ? commonStyles
    : { ...commonStyles, backgroundColor: '#f5f5f5' }

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
  }

  return (
    <Form.Control
        disabled={ type === SectionType.To }
        as="textarea"
        autoFocus={type === SectionType.From}
        placeholder={getPlaceholder({ type, loading })}
        style={styles}
        value={value}
        onChange={handleChange}
    />
  )
}
