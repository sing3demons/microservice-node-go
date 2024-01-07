function maskEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
    if (emailRegex.test(email)) {
      const [localPart, domain] = email.split('@')
  
      const maskedLocalPart =
        localPart.charAt(0) + '*'.repeat(localPart.length - 1)
  
      const maskedEmail = `${maskedLocalPart}@${domain}`
  
      return maskedEmail
    } else {
      return email
    }
  }

  export {maskEmail}