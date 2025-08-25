import { useState, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../api/auth/[...nextauth]'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FadeIn } from '@/components/animations'

interface Contact {
  _id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: string
  read: boolean
}

interface ContactsPageProps {
  initialContacts: Contact[]
}

export default function ContactsPage({ initialContacts }: ContactsPageProps) {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')

  const markAsRead = async (id: string) => {
    try {
      const response = await fetch(`/api/contacts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ read: true }),
      })
      
      if (response.ok) {
        setContacts(contacts.map(contact => 
          contact._id === id ? { ...contact, read: true } : contact
        ))
        if (selectedContact && selectedContact._id === id) {
          setSelectedContact({ ...selectedContact, read: true })
        }
      }
    } catch (error) {
      console.error('Error marking contact as read:', error)
    }
  }

  const deleteContact = async (id: string) => {
    if (confirm('Are you sure you want to delete this contact message?')) {
      try {
        const response = await fetch(`/api/contacts/${id}`, {
          method: 'DELETE',
        })
        
        if (response.ok) {
          setContacts(contacts.filter(contact => contact._id !== id))
          if (selectedContact && selectedContact._id === id) {
            setSelectedContact(null)
          }
        }
      } catch (error) {
        console.error('Error deleting contact:', error)
      }
    }
  }

  const filteredContacts = contacts.filter(contact => {
    if (filter === 'unread') return !contact.read
    if (filter === 'read') return contact.read
    return true
  })

  const unreadCount = contacts.filter(contact => !contact.read).length

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Contact Messages</h1>
              <p className="text-muted-foreground mt-1">
                {unreadCount} unread message{unreadCount !== 1 ? 's' : ''}
              </p>
            </div>
            <Button onClick={() => window.location.href = '/admin/dashboard'}>
              Back to Dashboard
            </Button>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contacts List */}
          <div className="lg:col-span-1">
            <FadeIn>
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Messages</CardTitle>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant={filter === 'all' ? 'default' : 'outline'}
                        onClick={() => setFilter('all')}
                      >
                        All
                      </Button>
                      <Button
                        size="sm"
                        variant={filter === 'unread' ? 'default' : 'outline'}
                        onClick={() => setFilter('unread')}
                      >
                        Unread ({unreadCount})
                      </Button>
                      <Button
                        size="sm"
                        variant={filter === 'read' ? 'default' : 'outline'}
                        onClick={() => setFilter('read')}
                      >
                        Read
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {filteredContacts.map((contact) => (
                      <div
                        key={contact._id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedContact?._id === contact._id
                            ? 'bg-primary/10 border-primary'
                            : 'hover:bg-muted/50'
                        } ${
                          !contact.read ? 'border-l-4 border-l-primary' : ''
                        }`}
                        onClick={() => {
                          setSelectedContact(contact)
                          if (!contact.read) {
                            markAsRead(contact._id)
                          }
                        }}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <h3 className={`font-medium text-sm ${
                            !contact.read ? 'font-bold' : ''
                          }`}>
                            {contact.name}
                          </h3>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(contact.createdAt)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {contact.email}
                        </p>
                        <p className={`text-sm ${
                          !contact.read ? 'font-semibold' : ''
                        }`}>
                          {contact.subject}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {contact.message.substring(0, 50)}...
                        </p>
                      </div>
                    ))}
                    {filteredContacts.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        No messages found
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2">
            <FadeIn>
              <Card>
                <CardHeader>
                  <CardTitle>
                    {selectedContact ? 'Message Details' : 'Select a Message'}
                  </CardTitle>
                  {selectedContact && (
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`)}
                      >
                        Reply via Email
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteContact(selectedContact._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  {selectedContact ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">
                            Name
                          </label>
                          <p className="font-medium">{selectedContact.name}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">
                            Email
                          </label>
                          <p className="font-medium">{selectedContact.email}</p>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Subject
                        </label>
                        <p className="font-medium">{selectedContact.subject}</p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Received
                        </label>
                        <p className="font-medium">{formatDate(selectedContact.createdAt)}</p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Status
                        </label>
                        <p className="font-medium">
                          <span className={`inline-block px-2 py-1 text-xs rounded ${
                            selectedContact.read
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {selectedContact.read ? 'Read' : 'Unread'}
                          </span>
                        </p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Message
                        </label>
                        <div className="mt-2 p-4 bg-muted/50 rounded-lg">
                          <p className="whitespace-pre-wrap">{selectedContact.message}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <p>Select a message from the list to view details</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const session = await getServerSession(context.req, context.res, authOptions)
    
    if (!session || session.user.role !== 'admin' || !session.user.isActive) {
      return {
        redirect: {
          destination: '/admin/login',
          permanent: false,
        },
      }
    }

    try {
      const response = await fetch(`${process.env.NEXTAUTH_URL}/api/contacts`)
      const contacts = response.ok ? await response.json() : []
      
      return {
        props: {
          initialContacts: contacts,
        },
      }
    } catch (error) {
      return {
        props: {
          initialContacts: [],
        },
      }
    }
  } catch (error) {
    console.warn('Build-time authentication check failed:', error)
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false
      }
    }
  }
}