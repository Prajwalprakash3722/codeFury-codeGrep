import { Button, Group, Modal, PasswordInput } from '@mantine/core';

import React from 'react'

type Props = {
  updateUser: boolean;
  setUpdateUser: (opened: boolean) => void;
  form: any;
  submitForm: (values: any) => Promise<void>;
  toast: any;
}

const UpdateUserModal = ({ form, updateUser, setUpdateUser, submitForm, toast }: Props): JSX.Element => {
  return (
    <div>
      <Modal
        centered
        opened={updateUser}
        onClose={() => setUpdateUser(false)}
        title="Update User"
      >
        <form
          onSubmit={form.onSubmit(
            async (values: any) =>
              await toast.promise(submitForm(values), {
                loading: "Loading",
                success: null,
                error: null,
              })
          )}
          className="p-8 mb-0"
        >
          <PasswordInput
            required
            label="Password"
            placeholder="Password"
            {...form.getInputProps("password")}
          />

          <PasswordInput
            required
            mt="sm"
            label="Confirm password"
            placeholder="Confirm password"
            {...form.getInputProps("confirmPassword")}
          />
          <Group position="center" mt="xl">
            <Button type="submit">
              Change Password
            </Button>
          </Group>
        </form>
      </Modal>
    </div>
  )
}

export default UpdateUserModal;