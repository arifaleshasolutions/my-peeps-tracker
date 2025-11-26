import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Pencil, Trash2 } from "lucide-react";
import { Contact } from "./ContactForm";

interface ContactCardProps {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (id: string) => void;
}

const ContactCard = ({ contact, onEdit, onDelete }: ContactCardProps) => {
  return (
    <Card className="p-6 shadow-md hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-foreground">{contact.name}</h3>
        <div className="flex gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onEdit(contact)}
            className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onDelete(contact.id)}
            className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Mail className="h-4 w-4 text-primary" />
          <span className="text-sm">{contact.email}</span>
        </div>

        <div className="flex items-center gap-3 text-muted-foreground">
          <Phone className="h-4 w-4 text-primary" />
          <span className="text-sm">{contact.phone}</span>
        </div>

        {contact.address && (
          <div className="flex items-start gap-3 text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <span className="text-sm">{contact.address}</span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ContactCard;
