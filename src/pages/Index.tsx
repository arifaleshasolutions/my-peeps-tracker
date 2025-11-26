import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import ContactForm, { Contact } from "@/components/ContactForm";
import ContactList from "@/components/ContactList";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContacts } from "@/hooks/useContacts";
import { User } from "@supabase/supabase-js";
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

const Index = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [editingContact, setEditingContact] = useState<Contact | undefined>();
  const [contactToDelete, setContactToDelete] = useState<string | null>(null);
  const { contacts, isLoading, addContact, updateContact, deleteContact } = useContacts();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        if (!session?.user) {
          navigate("/auth");
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const handleAddContact = (contact: Omit<Contact, "id">) => {
    addContact(contact);
  };

  const handleUpdateContact = (contact: Contact) => {
    updateContact(contact);
    setEditingContact(undefined);
  };

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact);
  };

  const handleDelete = (id: string) => {
    setContactToDelete(id);
  };

  const confirmDelete = () => {
    if (contactToDelete) {
      deleteContact(contactToDelete);
      setContactToDelete(null);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Contact Manager</h1>
            <p className="text-muted-foreground">Manage your contacts efficiently</p>
          </div>
          <Button onClick={handleSignOut} variant="outline" size="sm">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <ContactForm
              onAddContact={handleAddContact}
              onUpdateContact={handleUpdateContact}
              editingContact={editingContact}
              onCancelEdit={() => setEditingContact(undefined)}
            />
          </div>

          <div className="lg:col-span-2">
            {isLoading ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground">Loading contacts...</p>
              </div>
            ) : (
              <ContactList contacts={contacts} onEdit={handleEdit} onDelete={handleDelete} />
            )}
          </div>
        </div>
      </div>

      <AlertDialog open={!!contactToDelete} onOpenChange={() => setContactToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this contact.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Index;
