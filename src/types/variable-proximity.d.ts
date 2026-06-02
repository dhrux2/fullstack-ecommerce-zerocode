declare module '@/components/VariableProximity' {
  import React, { RefObject } from 'react'
  
  export interface VariableProximityProps {
    label: string
    className?: string
    fromFontVariationSettings?: string
    toFontVariationSettings?: string
    containerRef?: RefObject<HTMLDivElement | null>
    radius?: number
    falloff?: 'linear' | 'gaussian' | 'exponential'
  }
  
  const VariableProximity: React.FC<VariableProximityProps>
  export default VariableProximity
}
