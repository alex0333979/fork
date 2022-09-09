import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import classNames from 'classnames'

import {
  CartItemInput,
  FieldType,
  FormStep,
  ProductSku,
  ProductCategory,
  useAddItemsToCartMutation,
  useSubmitEntryMutation,
} from '@/apollo'

import ProcessStep, {
  ProcessStepProps,
} from '@/components/elements/processStep'
import ApplicationToolbar from '@/components/elements/applicationToolbar'
import { useAuth } from '@/hooks'
import { formValidation, getHumanizedName } from '@/utils'
import { ValidationError } from '@/types'
import { PAGES } from '@/constants'
import ApplicationList from '../applicationList'

import FormStep1 from './formStep1'
import FormElement from './formElement'
import { FormProps } from './types'

const ApplicationForm: React.FC<FormProps> = ({ forms, entry, step }) => {
  const router = useRouter()
  const { updateMe } = useAuth()

  const [formStep, setFormStep] = useState<FormStep | undefined>()
  const [country, setCountry] = useState<string>('')
  const [isOpenAddForm, setIsOpenAddForm] = useState<boolean>(false)
  const [error, setError] = useState<ValidationError>({})

  const [submitEntry, { loading: submittingEntry }] = useSubmitEntryMutation()
  const [addToCart, { loading: addingToCart }] = useAddItemsToCartMutation()

  useEffect(() => {
    setCountry('')
    setFormStep(undefined)
    setError({})
  }, [step])

  useEffect(() => {
    if (!formStep) {
      setFormStep(entry.form.steps.find((s) => s.step === step))
    }
  }, [entry.form.steps, formStep, step])

  const process: ProcessStepProps = useMemo(
    () => ({
      title: entry.form.description,
      step,
      completeStep: entry.completeStep,
      steps: entry.form.steps.map((s) => ({
        name: s.name,
        step: s.step,
        fieldsCount: s.fields?.length || 0,
        link: entry.id
          ? `${PAGES.application.index}${entry.id}/${s.step}`
          : PAGES.application.index,
      })),
    }),
    [
      entry.completeStep,
      entry.form.description,
      entry.form.steps,
      entry.id,
      step,
    ],
  )

  const entryUserName = useMemo((): string => {
    const a = formStep?.fields.find((f) => f.name === 'first_name')
    const b = formStep?.fields.find((l) => l.name === 'last_name')

    return getHumanizedName([a?.value, b?.value])
  }, [formStep?.fields])

  const onValueChange = useCallback(
    (name: string, value: string | number | boolean | undefined) => {
      if (!formStep) return
      const _formStep = { ...formStep }

      const fieldIndex = _formStep.fields.findIndex(
        (field) => field.name === name,
      )
      if (fieldIndex === -1) return

      _formStep.fields[fieldIndex].value = value
      if (name === 'issued_us_passport_book_card') {
        const fields = _formStep.fields.map((field) => {
          if (field.name !== 'issued_us_passport_book_card') {
            return { ...field, disabled: value === true }
          }

          return field
        })

        _formStep.fields = fields
      }

      setFormStep(_formStep)
      setError({})
    },
    [formStep],
  )

  const onSetStatePickerDisable = useCallback(
    (status: boolean) => {
      if (!formStep) return
      const _formStep = { ...formStep }

      const fieldIndex = _formStep.fields.findIndex(
        (field) => field.type === FieldType.StatePicker,
      )
      if (fieldIndex === -1) return

      _formStep.fields[fieldIndex].disabled = status
      setFormStep(formStep)
      setError({})
    },
    [formStep],
  )

  const onSelectCountry = useCallback(
    (name: string, value: string) => {
      if (country !== value) {
        onValueChange(name, value)
        setCountry(value)
        onSetStatePickerDisable(!['US', 'CA'].includes(value))
      }
    },
    [country, onSetStatePickerDisable, onValueChange],
  )

  const onAddToCartItem = useCallback(
    async (cartItem: CartItemInput) => {
      addToCart({
        variables: {
          cartItems: [cartItem],
        },
        onCompleted: (res) => {
          if (res.AddItemsToCart.data) {
            updateMe({ cart: res.AddItemsToCart.data })
            router.push(
              `${PAGES.application.index}${cartItem.productId}/${step + 1}`,
            )
          }
        },
      })
    },
    [addToCart, router, step, updateMe],
  )

  const onSubmit = useCallback(async () => {
    if (!formStep) return

    const error = formValidation(formStep.fields, country)
    setError(error)
    if (Object.keys(error).length > 0) return

    submitEntry({
      variables: { entryId: entry.id, formId: entry.formId, formStep },
      onCompleted: (res) => {
        const result = res?.SubmitEntry.data
        if (result) {
          if (step === 1) {
            onAddToCartItem({
              name: entryUserName,
              description: `Passport application ${result.form.name}`,
              productId: result.id,

              productSku: ProductSku.Application,
              productCategory: ProductCategory.Application,
            })
          } else {
            if (step > entry.form.steps.length - 1) {
              router.push(PAGES.cart)
            } else {
              router.push(`${PAGES.application.index}${result.id}/${step + 1}`)
            }
          }
        }
      },
    })
  }, [
    formStep,
    country,
    submitEntry,
    entry.id,
    entry.formId,
    entry.form.steps.length,
    step,
    onAddToCartItem,
    entryUserName,
    router,
  ])

  return (
    <div className="application-page">
      <ApplicationList
        currentId={entry.id}
        isOpenAddFrom={isOpenAddForm}
        openAddForm={setIsOpenAddForm}
      />
      <div className="floating-wrap">
        <div
          className={classNames('application-form', { blur: isOpenAddForm })}>
          <div className="container">
            <div className="data-wrap horizontal">
              <ProcessStep
                title={process.title}
                step={process.step}
                steps={process.steps}
                completeStep={process.completeStep}
              />
              <div className="form-wrap">
                {!!formStep?.notes && (
                  <div className="form-fields">
                    <div className="form-notice">
                      <p>
                        {formStep.notes}
                        <span className="icon-info" />
                      </p>
                    </div>
                  </div>
                )}
                {step === 1 && <FormStep1 forms={forms} entry={entry} />}
                <form>
                  <div className="form-fields">
                    {formStep?.fields.map(
                      (field, index) =>
                        !field.disabled && (
                          <FormElement
                            key={`${index}_${step}`}
                            field={field}
                            country={country}
                            error={error[field.name]}
                            onValueChange={onValueChange}
                            onSelectCountry={onSelectCountry}
                          />
                        ),
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <ApplicationToolbar
          backLink={
            step > 1
              ? `${PAGES.application.index}${entry.id}/${step - 1}`
              : undefined
          }
          loading={addingToCart || submittingEntry}
          blur={isOpenAddForm}
          onNext={onSubmit}
        />
      </div>
    </div>
  )
}

export default ApplicationForm
