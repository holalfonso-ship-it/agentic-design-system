import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "./Avatar";
import { meta as avatarMeta } from "./Avatar.metadata";

const meta: Meta<typeof Avatar> = {
  title: "Data Display/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `${avatarMeta.description}\n\n**Cuándo usarlo:** ${avatarMeta.useWhen}`,
      },
    },
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
  args: { initials: "AZ", size: "md" },
};
export default meta;
type Story = StoryObj<typeof Avatar>;

export const Small: Story = { args: { size: "sm" } };
export const Medium: Story = { args: { size: "md" } };
export const Large: Story = { args: { size: "lg" } };

export const LosTresTamanos: Story = {
  name: "Los 3 tamaños",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Avatar initials="AZ" size="sm" />
      <Avatar initials="MC" size="md" />
      <Avatar initials="CJ" size="lg" />
    </div>
  ),
};
