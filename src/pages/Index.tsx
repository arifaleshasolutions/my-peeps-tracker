import { useState } from "react";
import ContactForm, { Contact } from "@/components/ContactForm";
import ContactList from "@/components/ContactList";
import { Users } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

const Index = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [editingContact, setEditingContact] = useState<Contact | undefined>();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleAddContact = (contactData: Omit<Contact, "id">) => {
    const newContact: Contact = {
      ...contactData,
      id: Date.now().toString(),
    };
    setContacts([...contacts, newContact]);
  };

  const handleUpdateContact = (updatedContact: Contact) => {
    setContacts(contacts.map((c) => (c.id === updatedContact.id ? updatedContact : c)));
    setEditingContact(undefined);
  };

  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter((c) => c.id !== id));
    setDeleteId(null);
    toast.success("Contact deleted successfully");
  };

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="h-10 w-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Contact Manager</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Organize and manage your contacts effortlessly
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-1">
            <ContactForm
              onAddContact={handleAddContact}
              editingContact={editingContact}
              onUpdateContact={handleUpdateContact}
              onCancelEdit={() => setEditingContact(undefined)}
            />
          </div>

          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                Your Contacts
                {contacts.length > 0 && (
                  <span className="text-muted-foreground ml-2">({contacts.length})</span>
                )}
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent rounded-full" />
            </div>
            <ContactList
              contacts={contacts}
              onEdit={handleEdit}
              onDelete={(id) => setDeleteId(id)}
            />
          </div>
        </div>

        <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Contact</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this contact? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteId && handleDeleteContact(deleteId)}
                className="bg-destructive hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default Index;
