import LoadingButton from '@/components/LoadingButton'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

type SaveRecurrenceDialogProps = {
  isPending: boolean
  isReadOnly: boolean
  hasRecurrence: boolean
}

const SaveRecurrenceDialog = ({
  hasRecurrence,
  isReadOnly,
  isPending,
}: SaveRecurrenceDialogProps) => {
  if (!hasRecurrence) {
    return (
      <LoadingButton
        isLoading={isPending}
        disabled={isReadOnly}
        type="submit"
        loadingText="Saving..."
      >
        Save
      </LoadingButton>
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button">Save</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Save recurring event</DialogHeader>
        <RadioGroup defaultValue="comfortable">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="default" id="r1" />
            <Label htmlFor="r1">Default</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="comfortable" id="r2" />
            <Label htmlFor="r2">Comfortable</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="compact" id="r3" />
            <Label htmlFor="r3">Compact</Label>
          </div>
        </RadioGroup>
        <DialogFooter>
          <LoadingButton
            isLoading={isPending}
            disabled={isReadOnly}
            type="submit"
            loadingText="Saving..."
          >
            Save
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default SaveRecurrenceDialog
