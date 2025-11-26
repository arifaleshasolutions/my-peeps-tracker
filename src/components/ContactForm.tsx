import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface ContactFormProps {
  onAddContact: (contact: Omit<Contact, "id">) => void;
  editingContact?: Contact;
  onUpdateContact?: (contact: Contact) => void;
  onCancelEdit?: () => void;
}

const ContactForm = ({ onAddContact, editingContact, onUpdateContact, onCancelEdit }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: editingContact?.name || "",
    email: editingContact?.email || "",
    phone: editingContact?.phone || "",
    address: editingContact?.address || "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      phone: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    }

    setErrors(newErrors);
    return !newErrors.name && !newErrors.email && !newErrors.phone;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    if (editingContact && onUpdateContact) {
      onUpdateContact({ ...editingContact, ...formData });
      toast.success("Contact updated successfully!");
    } else {
      onAddContact(formData);
      toast.success("Contact added successfully!");
      setFormData({ name: "", email: "", phone: "", address: "" });
    }
  };

  const handleCancel = () => {
    setFormData({ name: "", email: "", phone: "", address: "" });
    setErrors({ name: "", email: "", phone: "" });
    onCancelEdit?.();
  };

  return (
    <Card className="p-6 shadow-lg border-border/50">
      <h2 className="text-2xl font-semibold mb-6 text-foreground">
        {editingContact ? "Edit Contact" : "Add New Contact"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={errors.name ? "border-destructive" : ""}
            placeholder="John Doe"
          />
          {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
        </div>

        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={errors.email ? "border-destructive" : ""}
            placeholder="john@example.com"
          />
          {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
        </div>

        <div>
          <Label htmlFor="phone">Phone *</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={errors.phone ? "border-destructive" : ""}
            placeholder="+1 234 567 8900"
          />
          {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
        </div>

        <div>
          <Label htmlFor="address">Address</Label>
          <Textarea
            id="address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            placeholder="123 Main St, City, Country"
            rows={3}
          />
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="submit" className="flex-1">
            {editingContact ? "Update Contact" : "Add Contact"}
          </Button>
          {editingContact && (
            <Button type="button" variant="outline" onClick={handleCancel} className="flex-1">
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
};

export default ContactForm;
