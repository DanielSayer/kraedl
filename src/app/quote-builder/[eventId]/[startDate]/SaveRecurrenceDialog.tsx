import LoadingButton from '@/components/LoadingButton'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ErrorMessage } from '@/components/ui/errorMessage'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { isEmpty } from '@/lib/utils'
import type { QuoteBuilder } from '@/lib/validations/events'
import { useFormContext } from 'react-hook-form'

type SaveRecurrenceDialogProps = {
  isPending: boolean
  isReadOnly: boolean
}

const SaveRecurrenceDialog = ({
  isReadOnly,
  isPending,
}: SaveRecurrenceDialogProps) => {
  const { formState } = useFormContext<QuoteBuilder>()
  const hasChanged = !isEmpty(formState.dirtyFields)
  const hasRecurrence =
    formState.defaultValues?.recurrence?.frequency !== 'NONE'

  if (!hasRecurrence || !hasChanged) {
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
        <DialogHeader>
          Update recurring event
          <p className="text-sm text-muted-foreground">
            Select the scenario that applies.
          </p>
        </DialogHeader>
        <Separator />
        <RadioGroup defaultValue="this">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="this" id="r1" />
            <Label htmlFor="r1">This event</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="future" id="r2" />
            <Label htmlFor="r2">Future Events</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="r3" />
            <Label htmlFor="r3">All Events</Label>
          </div>
        </RadioGroup>
        <Separator />
        <DialogFooter>
          <ErrorMessage>{formState.errors.root?.message}</ErrorMessage>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <LoadingButton
            isLoading={isPending}
            disabled={isReadOnly}
            type="submit"
            loadingText="Saving..."
            form="quote-builder"
          >
            Save
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default SaveRecurrenceDialog
