import { Guidelines, withExamples, Demo } from "../../stories/Guidelines";
import { meta as guidelinesMeta } from "./Textarea.metadata";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea } from "./Textarea";
import { meta as textareaMeta } from "./Textarea.metadata";

const meta: Meta<typeof Textarea> = {
  title: "Form/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `${textareaMeta.description}\n\n**Cuándo usarlo:** ${textareaMeta.useWhen}`,
      },
    },
  },
  argTypes: {
    error: { control: "boolean" },
    disabled: { control: "boolean" },
    rows: { control: "number" },
  },
  args: { label: "Mensaje", placeholder: "Escribe aquí tu mensaje", helperText: "Texto de ayuda" },
};
export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {};
export const ConValor: Story = {
  name: "Con valor",
  args: { defaultValue: "Hola, quería consultar el estado de mi transferencia." },
};
export const Error: Story = { args: { error: true, errorText: "Escribe al menos 10 caracteres" } };
export const Disabled: Story = { args: { disabled: true } };

export const LosCuatroEstados: Story = {
  name: "Los 4 estados",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 320 }}>
      <Textarea label="Mensaje" placeholder="Escribe aquí tu mensaje" helperText="Texto de ayuda" />
      <Textarea label="Mensaje" defaultValue="Hola, quería consultar mi transferencia." helperText="Texto de ayuda" />
      <Textarea label="Mensaje" placeholder="Escribe aquí tu mensaje" error errorText="Escribe al menos 10 caracteres" />
      <Textarea label="Mensaje" placeholder="Escribe aquí tu mensaje" helperText="Texto de ayuda" disabled />
    </div>
  ),
};

const examples = [
  {
    good: (
      <Demo code={'<Textarea label="Comentario" rows={4} helperText="Cuéntanos qué ha pasado" />'}>
        <Textarea label="Comentario" rows={4} helperText="Cuéntanos qué ha pasado" />
      </Demo>
    ),
    bad: (
      <Demo code={'<Textarea label="Nombre" rows={1} />'}>
        <Textarea label="Nombre" rows={1} style={{ minHeight: 0 }} />
      </Demo>
    ),
  },
  {
    good: (
      <Demo code={'<Textarea label="Motivo" maxLength={280} helperText="Máximo 280 caracteres"\n  error errorText="Cuéntanos al menos 10 caracteres" />'}>
        <Textarea label="Motivo" maxLength={280} helperText="Máximo 280 caracteres" error errorText="Cuéntanos al menos 10 caracteres" />
      </Demo>
    ),
    bad: (
      <Demo code={'<Textarea label="Motivo" maxLength={280} error />'}>
        <Textarea label="Motivo" maxLength={280} error />
      </Demo>
    ),
  },
];

export const DosYDonts: Story = {
  name: "Do's y don'ts",
  parameters: { controls: { disable: true } },
  render: () => <Guidelines items={withExamples(guidelinesMeta.guidelines, examples)} />,
};
