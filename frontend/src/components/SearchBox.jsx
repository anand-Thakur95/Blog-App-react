import React from 'react'
import { Input } from './ui/input'

function SearchBox() {
  return (
    <div>
      <form>
        <Input placeholder="Search here..." className="h-9 bg-gray-50">
        </Input>
      </form>
    </div>
  )
}

export default SearchBox
