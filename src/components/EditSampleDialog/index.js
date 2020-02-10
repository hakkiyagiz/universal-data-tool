// @flow

import React, { useState, useEffect } from "react"
import Box from "@material-ui/core/Box"
import AceEditor from "react-ace"
import SimpleDialog from "../SimpleDialog"

export default ({ open, sampleIndex, sampleInput, onChange, onClose }) => {
  const [text, changeText] = useState()
  const [error, changeError] = useState()
  useEffect(() => {
    const newText = JSON.stringify(sampleInput, null, "  ")
    if (newText !== text) {
      changeText(newText)
    }
  }, [sampleInput])

  return (
    <SimpleDialog
      open={open}
      onClose={onClose}
      title={`Sample ${sampleIndex} Input Data`}
    >
      <AceEditor
        theme="github"
        mode="javascript"
        width="100%"
        value={text}
        editorProps={{ $blockScrolling: Infinity }}
        onChange={t => {
          changeText(t)
          try {
            onChange(JSON.parse(text))
            changeError(null)
          } catch (e) {
            changeError(e.toString())
          }
        }}
      />
      <Box color="red">{error}</Box>
    </SimpleDialog>
  )
}
