import { TopBar } from '../components/layout/TopBar'
import { ContextHeader } from '../components/layout/ContextHeader'
import { PrimaryWorkspace } from '../components/layout/PrimaryWorkspace'
import { SecondaryPanel } from '../components/layout/SecondaryPanel'
import { ProofFooter } from '../components/layout/ProofFooter'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card'
import { StatusBadge } from '../components/ui/StatusBadge'
import { ProgressIndicator } from '../components/ui/ProgressIndicator'
import { Checkbox } from '../components/ui/Checkbox'
import { useState } from 'react'

function ColorSwatch({ name, color, hex }: { name: string; color: string; hex: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="w-full h-20 rounded-sm border border-foreground/10"
        style={{ backgroundColor: hex }}
      />
      <div>
        <p className="font-medium text-foreground">{name}</p>
        <p className="text-sm text-foreground/60">{hex}</p>
      </div>
    </div>
  )
}

function SpacingDemo({ size, label }: { size: string; label: string }) {
  return (
    <div className="flex items-center gap-4">
      <div
        className="bg-accent/20 border border-accent/30"
        style={{ width: size, height: '24px' }}
      />
      <span className="text-sm text-foreground/70">{label}</span>
    </div>
  )
}

export default function DesignSystem() {
  const [checked, setChecked] = useState(false)
  const [inputValue, setInputValue] = useState('')

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopBar
        projectName="KodNest Premium Build System"
        currentStep={1}
        totalSteps={5}
        status="in-progress"
      />

      <ContextHeader
        title="Design System"
        subtitle="A calm, intentional, and coherent design system for premium SaaS products."
      />

      <div className="flex-1 flex min-h-0">
        <PrimaryWorkspace>
          <div className="space-y-10 max-w-text">
            {/* Color Palette */}
            <section>
              <h2 className="font-serif text-2xl text-foreground mb-6">Color Palette</h2>
              <div className="grid grid-cols-5 gap-4">
                <ColorSwatch name="Background" color="background" hex="#F7F6F3" />
                <ColorSwatch name="Foreground" color="foreground" hex="#111111" />
                <ColorSwatch name="Accent" color="accent" hex="#8B0000" />
                <ColorSwatch name="Success" color="success" hex="#4A7C59" />
                <ColorSwatch name="Warning" color="warning" hex="#B8860B" />
              </div>
            </section>

            {/* Typography */}
            <section>
              <h2 className="font-serif text-2xl text-foreground mb-6">Typography</h2>
              <div className="space-y-6">
                <div>
                  <h1 className="font-serif text-4xl text-foreground mb-2">Heading 1</h1>
                  <p className="text-sm text-foreground/50">Serif, 36px, line-height 1.2</p>
                </div>
                <div>
                  <h2 className="font-serif text-3xl text-foreground mb-2">Heading 2</h2>
                  <p className="text-sm text-foreground/50">Serif, 30px, line-height 1.2</p>
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-foreground mb-2">Heading 3</h3>
                  <p className="text-sm text-foreground/50">Serif, 24px, line-height 1.2</p>
                </div>
                <div>
                  <p className="text-base text-foreground leading-relaxed">
                    Body text uses a clean sans-serif font at 16px with a line-height of 1.6.
                    This ensures optimal readability for longer content blocks.
                  </p>
                  <p className="text-sm text-foreground/50 mt-2">Sans-serif, 16px, line-height 1.6, max-width 720px</p>
                </div>
              </div>
            </section>

            {/* Spacing */}
            <section>
              <h2 className="font-serif text-2xl text-foreground mb-6">Spacing System</h2>
              <div className="space-y-3">
                <SpacingDemo size="8px" label="8px - xs" />
                <SpacingDemo size="16px" label="16px - sm" />
                <SpacingDemo size="24px" label="24px - md" />
                <SpacingDemo size="40px" label="40px - lg" />
                <SpacingDemo size="64px" label="64px - xl" />
              </div>
            </section>

            {/* Components */}
            <section>
              <h2 className="font-serif text-2xl text-foreground mb-6">Components</h2>
              
              <div className="space-y-8">
                {/* Buttons */}
                <div>
                  <h3 className="font-serif text-xl text-foreground mb-4">Buttons</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="primary">Primary Button</Button>
                    <Button variant="secondary">Secondary Button</Button>
                    <Button variant="primary" size="sm">Small</Button>
                    <Button variant="secondary" size="sm">Small</Button>
                    <Button variant="primary" disabled>Disabled</Button>
                  </div>
                </div>

                {/* Inputs */}
                <div>
                  <h3 className="font-serif text-xl text-foreground mb-4">Inputs</h3>
                  <div className="space-y-3 max-w-md">
                    <Input placeholder="Placeholder text" />
                    <Input value="Filled input" onChange={() => {}} />
                    <Input placeholder="Disabled input" disabled />
                  </div>
                </div>

                {/* Cards */}
                <div>
                  <h3 className="font-serif text-xl text-foreground mb-4">Cards</h3>
                  <Card className="max-w-md">
                    <CardHeader>
                      <CardTitle>Card Title</CardTitle>
                    </CardHeader>
                    <CardContent>
                      Card content with subtle border and no drop shadows.
                      Clean and intentional design.
                    </CardContent>
                  </Card>
                </div>

                {/* Status Badges */}
                <div>
                  <h3 className="font-serif text-xl text-foreground mb-4">Status Badges</h3>
                  <div className="flex gap-4">
                    <StatusBadge status="not-started" />
                    <StatusBadge status="in-progress" />
                    <StatusBadge status="shipped" />
                  </div>
                </div>

                {/* Progress Indicator */}
                <div>
                  <h3 className="font-serif text-xl text-foreground mb-4">Progress Indicator</h3>
                  <ProgressIndicator current={2} total={5} />
                </div>

                {/* Checkbox */}
                <div>
                  <h3 className="font-serif text-xl text-foreground mb-4">Checkbox</h3>
                  <Checkbox
                    id="demo-checkbox"
                    label="Checkbox label"
                    checked={checked}
                    onChange={setChecked}
                  />
                </div>
              </div>
            </section>
          </div>
        </PrimaryWorkspace>

        <SecondaryPanel
          stepExplanation="This design system establishes the visual foundation for all KodNest products. It ensures consistency, coherence, and a premium feel across every interface."
          promptText={`Create a premium SaaS design system with:
- Calm, intentional aesthetic
- 4-color palette maximum
- Serif headings, sans-serif body
- Consistent 8px spacing scale
- No gradients or glassmorphism`}
          onCopy={() => navigator.clipboard.writeText('Design system prompt')}
          onBuildInLovable={() => console.log('Build in Lovable')}
          onItWorked={() => console.log('It worked')}
          onError={() => console.log('Error')}
          onAddScreenshot={() => console.log('Add screenshot')}
        />
      </div>

      <ProofFooter />
    </div>
  )
}
