import { Contact } from "./ContactForm";
import ContactCard from "./ContactCard";
import { Users } from "lucide-react";

interface ContactListProps {
  contacts: Contact[];
  onEdit: (contact: Contact) => void;
  onDelete: (id: string) => void;
}

const ContactList = ({ contacts, onEdit, onDelete }: ContactListProps) => {
  if (contacts.length === 0) {
    return (
      <div className="text-center py-16">
        <Users className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
        <h3 className="text-xl font-semibold text-muted-foreground mb-2">No contacts yet</h3>
        <p className="text-muted-foreground">Add your first contact to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {contacts.map((contact) => (
        <ContactCard
          key={contact.id}
          contact={contact}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ContactList;
