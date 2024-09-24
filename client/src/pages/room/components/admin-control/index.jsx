import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSocketEmitters } from "@/hooks/useSocketEmitters";
import { useParams } from "react-router-dom";

export const AdminControl = () => {
  const [emails, setEmails] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(null);
  const { sendInvites } = useSocketEmitters();
  const { roomId } = useParams();

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return re.test(String(email).toLowerCase());
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setError(null);
  };

  const handleInputKeyDown = (e) => {
    if (["Enter", "Tab", ","].includes(e.key)) {
      e.preventDefault();
      addEmail();
    }
  };

  const addEmail = () => {
    const trimmedEmail = inputValue.trim();
    if (trimmedEmail && validateEmail(trimmedEmail)) {
      if (!emails.includes(trimmedEmail)) {
        setEmails([...emails, trimmedEmail]);
        setInputValue("");
      } else {
        setError("This email has already been added.");
      }
    } else if (trimmedEmail) {
      setError("Please enter a valid email address.");
    }
  };

  const removeEmail = (emailToRemove) => {
    setEmails(emails.filter((email) => email !== emailToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emails.length > 0) {
      sendInvites({ emails, roomId });
      setEmails([]);
    } else {
      setError("Please add at least one valid email address.");
    }
  };

  return (
    <div className="flex h-full flex-col gap-3 p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email-input">Invite Friends</Label>
          <Input
            id="email-input"
            type="text"
            placeholder="Type email address and press Enter key"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            onBlur={addEmail}
            autocomplete="off"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
        {!!emails.length && (
          <div className="flex flex-wrap gap-2 text-sm">
            {emails.map((email) => (
              <div
                key={email}
                className="flex items-center gap-1 rounded bg-secondary px-2 py-1 text-secondary-foreground"
              >
                <span>{email}</span>
                <button type="button" onClick={() => removeEmail(email)} className="text-secondary-foreground">
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        <Button type="submit" className="w-full">
          Send Invites
        </Button>
      </form>
    </div>
  );
};
