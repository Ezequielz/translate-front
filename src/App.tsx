/* eslint-disable react/react-in-jsx-scope */
// eslint-disable-next-line import/no-absolute-path

import { useEffect, useRef, useState } from 'react'
import { Container, Row, Col, Button, Stack, Overlay, Tooltip } from 'react-bootstrap'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useStore } from './hooks/useStore'
import { useDebounce } from './hooks/useDebounce'
import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGE } from './constants'
import { ArrowsIcon, ClipboardIcon, SpeakerIcon } from './components/icons'
import { LanguageSelector } from './components/LanguageSelector'
import { SectionType } from './types.d'
import { TextArea } from './components/TextArea'
import { translate } from './services/translate'
import { translateService } from './services/translateService'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function App () {
  const {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,

    interChangeLanguages,
    setFromLanguages,
    setToLanguage,
    setFromText,
    setResult
  } = useStore()

  const debouncedFromtext = useDebounce(fromText, 300)
  const [show, setShow] = useState(false);
  const target = useRef(null);

  useEffect(() => {
    if (debouncedFromtext === '') return

    translateService({ fromLanguage, toLanguage, text: debouncedFromtext })
      .then((result:any) => {
        if (result == null) return
        setResult(result)
      })
      .catch(() => { setResult('Error') })
  }, [debouncedFromtext, fromLanguage, toLanguage])

  const handleClipboard = () => {
    navigator.clipboard.writeText(result).catch(() => {})
    setShow(true)

    setTimeout(() => {
      setShow(false)
    }, 1500);
  }
  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = VOICE_FOR_LANGUAGE[toLanguage]
    speechSynthesis.speak(utterance)
  }

  return (
    <Container fluid>
      <h1 style={{ fontSize: '2rem', textAlign: 'center' }}>Translate</h1>

      <Row>

        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={ SectionType.From }
              value={fromLanguage}
              onChange={setFromLanguages}
            />
            <TextArea
              placeholder='Introducir texto'
              type={ SectionType.From }
              value={fromText}
              onChange={ setFromText }
            />
          </Stack>
        </Col>

        <Col xs='auto'>
          <Button variant="link" disabled={fromLanguage === AUTO_LANGUAGE} onClick={interChangeLanguages}>
            <ArrowsIcon />
          </Button>
        </Col>

        <Col>
          <Stack gap={2}>

            <LanguageSelector
              type={ SectionType.To }
              value={toLanguage}
              onChange={setToLanguage}
            />
            <div style={{ position: 'relative' }} >
              <TextArea
                loading={loading}
                placeholder='Traducción'
                type={ SectionType.To }
                value={ result }
                onChange={ setResult }
              />
              <div style={{ position: 'absolute', left: 0, bottom: 0, display: 'flex' }}>

             

                <Button
                  variant='link'
                  onClick={ handleClipboard }
                  ref={target}
                >
                  <ClipboardIcon />
                </Button>

                <Overlay target={target.current} show={show} placement="bottom" >
                  {({
                    placement: _placement,
                    arrowProps: _arrowProps,
                    show: _show,
                    popper: _popper,
                    hasDoneInitialMeasure: _hasDoneInitialMeasure,
                    ...props
                  }) => (
                    <div
                      {...props}
                      style={{
                        position: 'absolute',
                        backgroundColor: 'rgba(25, 135, 84, 0.85)',
                        padding: '2px 10px',
                        color: 'white',
                        borderRadius: 3,
                        ...props.style,
                      }}
                    >
                      Copied text
                    </div>
                  )}
                </Overlay>
              

                <Button
                  variant='link'
                  onClick={ handleSpeak }
                >
                  <SpeakerIcon />
                </Button>
              </div>
            </div>
          </Stack>
        </Col>

      </Row>

    </Container>
  )
}

export default App
