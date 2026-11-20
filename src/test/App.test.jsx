import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'

describe('App', () => {
    it('affiche le titre et le champ de saisie', () => {
        render(
            <ChakraProvider value={defaultSystem}>
                <App />
            </ChakraProvider>
        )

        expect(screen.getByRole('heading', { name: 'Todo List' })).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Nouvelle tache')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Ajouter' })).toBeInTheDocument()
    })

    it('ajoute une tâche en cliquant sur Ajouter', async () => {
        const user = userEvent.setup()
        render(
            <ChakraProvider value={defaultSystem}>
                <App />
            </ChakraProvider>,
        )

        const input = screen.getByPlaceholderText('Nouvelle tache')

        await user.type(input, 'Acheter du pain')
        await user.click(screen.getByRole('button', { name: 'Ajouter' }))

        expect(screen.getByText('Acheter du pain')).toBeInTheDocument()
        expect(input).toHaveValue('')
    })

    it('affiche une erreur si le champ est vide', async () => {
        const user = userEvent.setup()
        render(
            <ChakraProvider value={defaultSystem}>
                <App />
            </ChakraProvider>,
        )

        await user.click(screen.getByRole('button', { name: 'Ajouter' }))

        expect(screen.getByText('Ajouter un nom de tache.')).toBeInTheDocument()
    })

    it('affiche une erreur si le champ contient uniquement des espaces', async () => {
        const user = userEvent.setup()
        render(
            <ChakraProvider value={defaultSystem}>
                <App />
            </ChakraProvider>,
        )

        await user.type(screen.getByPlaceholderText('Nouvelle tache'), '   ')
        await user.click(screen.getByRole('button', { name: 'Ajouter' }))

        expect(screen.getByText('Ajouter un nom de tache.')).toBeInTheDocument()
    })

    it('supprime le message d\'erreur lorsque le champ est modifié', async () => {
        const user = userEvent.setup()
        render(
            <ChakraProvider value={defaultSystem}>
                <App />
            </ChakraProvider>,
        )

        await user.click(screen.getByRole('button', { name: 'Ajouter' }))
        expect(screen.getByText('Ajouter un nom de tache.')).toBeInTheDocument()

        await user.type(screen.getByPlaceholderText('Nouvelle tache'), 'Nouvelle tâche')

        expect(screen.queryByText('Ajouter un nom de tache.')).not.toBeInTheDocument()
    })

    it('ajoute une tâche en appuyant sur Entrée', async () => {
        const user = userEvent.setup()
        render(
            <ChakraProvider value={defaultSystem}>
                <App />
            </ChakraProvider>,
        )

        const input = screen.getByPlaceholderText('Nouvelle tache')

        await user.type(input, 'Faire les courses{Enter}')

        expect(screen.getByText('Faire les courses')).toBeInTheDocument()
        expect(input).toHaveValue('')
    })
})